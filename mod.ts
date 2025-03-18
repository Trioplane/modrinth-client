type ModrinthClientOptions = { auth?: string }

class ModrinthClient {
    options: ModrinthClientOptions = {};
    
    constructor(options: ModrinthClientOptions) {
        this.options = options;
    }
}