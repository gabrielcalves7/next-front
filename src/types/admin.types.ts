interface RequestDetails {
    status: number;
    method: string;
    path: string;
    ip_address: string;
    latency: number;
    request_body?: Record<string, any>;
}

export interface LogEntry {
    id: string;
    time: string;
    level: string;
    msg: string;
    source: {
        function: string;
        file: string;
        line: number;
    };
    error?: string;
    request?: RequestDetails;
}

export interface PaginatedLogResponse {
    logs: LogEntry[];
    total: number;
    page: number;
    limit: number;
}