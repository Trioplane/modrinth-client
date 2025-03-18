import { ModrinthClient } from "../mod.ts";

const modrinth = new ModrinthClient();

async function main() {
    console.log(await modrinth.getProject("legitimoose-figura-emoji-pack"))
}

main()