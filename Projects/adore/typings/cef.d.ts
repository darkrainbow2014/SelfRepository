declare interface Window {
    cefQuery(argument: CefQueryArgument): number; //向cef发出请求
    cefQueryCancel(request_id: number): void; //取消cef请求
}

interface CefQueryArgument {
    request: string, persistent: boolean,
    onSuccess: (response: string) => void,
    onFailure: (error_code: number, error_message: string) => void
}