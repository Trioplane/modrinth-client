interface ModrinthClientOptions { 
    /** 
     * Authentication token for using methods that require authorization.
     * Using said methods without this will return an error.
    */
    auth?: string; 
    /** 
     * Whether to use the staging API or the production API of Modrinth.
     * @default true
    */
    prod?: boolean 
}

type LowercaseOrUppercaseLetter = Lowercase<string> | Uppercase<string>
/** An identifier with 8 characters where each character can be lowercase or uppercase. */
type ModrinthID = `${LowercaseOrUppercaseLetter}${LowercaseOrUppercaseLetter}${LowercaseOrUppercaseLetter}${LowercaseOrUppercaseLetter}${LowercaseOrUppercaseLetter}${LowercaseOrUppercaseLetter}${LowercaseOrUppercaseLetter}${LowercaseOrUppercaseLetter}`
/** A slug that can be 3-64 characters long and can only accept letters, numbers, and the following: !@$()`.+,"-' */
type ModrinthSlug = string

const CONSTANTS = {
    staging_api: "https://staging-api.modrinth.com/v2",
    prod_api: "https://api.modrinth.com/v2",
}

export class ModrinthClient {
    options: ModrinthClientOptions = {};
    #defaultOptions: ModrinthClientOptions = { prod: true }
    /** Gets the correct API root determined by the `prod` option. */
    #api: string;
    
    /**
     * The client class for interacting with the Modrinth API easily. 
     * @param options Optional data to be declared.
     */
    constructor(options?: ModrinthClientOptions) {
        this.options = options || this.#defaultOptions;
        this.#api = this.options.prod ? CONSTANTS.prod_api : CONSTANTS.staging_api;
    }

    /** Correctly joins the API root and the route into one string. */
    #buildURI(route: string): string { return `${this.#api}${route[0] === "/" ? route : `/${route}`}` }

    async #get(route: string): Promise<object> {
        let res;
        if (this.options.auth) res = await fetch(this.#buildURI(route), { headers: { Authorization: this.options.auth } });
        else res = await fetch(this.#buildURI(route));
        return await res.json();
    }

    async getProject(id: ModrinthID): Promise<object>
    async getProject(slug: ModrinthSlug): Promise<object>
    async getProject(id: ModrinthID | ModrinthSlug): Promise<object> {
        const route = `/project/${id}`
        return await this.#get(route);
    }
}