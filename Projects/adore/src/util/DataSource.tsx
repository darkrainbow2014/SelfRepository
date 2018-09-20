type Dict = { [key: string]: {} }

/**
 * manager shared data and notify update 
 */
export class DataSource {
    private dataMap: Map<string, {}> = new Map()
    private subscribeHandlersMap: Map<string, Set<() => void>> = new Map()
    private updateBridge: DataModelUpdateBridge | undefined

    constructor(updateBridge: DataModelUpdateBridge) {
        this.updateBridge = updateBridge
        this.updateBridge.assignUiUpdater(data => {
            for (const key in data) {
                const value = data[key]
                this.set(key, value)
            }
        })
    }

    public set(key: string, value: {}, updateToBussiness: boolean = false) {
        this.dataMap.set(key, value)
        let storedHandlers = this.subscribeHandlersMap.get(key)
        if (storedHandlers) {
            storedHandlers.forEach(handler => handler())
        }
        if (this.updateBridge && updateToBussiness) { this.updateBridge.updateToBussiness({ key: value }) }
        return this
    }

    public get(key: string) {
        this.dataMap.get(key)
    }

    public has(key: string) {
        return this.dataMap.has(key)
    }

    public delete(key: string) {
        return this.dataMap.delete(key)
    }

    public subscribe(key: string, handler: () => void) {
        let storedHandlers = this.subscribeHandlersMap.get(key)
        if (!storedHandlers) {
            this.subscribeHandlersMap.set(key, storedHandlers = new Set())
        }
        storedHandlers.add(handler)
    }

    public unsubscribe(key: string, handler: () => void) {
        let storedHandlers = this.subscribeHandlersMap.get(key)
        if (!storedHandlers) { return }
        storedHandlers.delete(handler)
    }
}

type Updater = (data: Dict) => void

/**
 * manage update between java and js layer 
 */
export class DataModelUpdateBridge {
    private bussinessUpdater: Updater | undefined
    private uiUpdater: Updater | undefined

    public assignBussinessUpdater(updater: (data: Dict) => void) {
        this.bussinessUpdater = updater
    }

    public updateToBussiness(data: Dict) {
        if (this.bussinessUpdater) { this.bussinessUpdater(data) }
    }

    public assignUiUpdater(updater: (data: Dict) => void) {
        this.uiUpdater = updater
    }

    public updateToUi(data: Dict) {
        if (this.uiUpdater) { this.uiUpdater(data) }
    }
}