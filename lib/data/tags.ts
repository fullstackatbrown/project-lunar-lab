import fs from "fs";
import path from "path";
import { TagSchema, Tag, TagIdSchema } from '../schemas/tagSchema';

const TAGS_DIRECTORY = path.join(process.cwd(), 'content', 'tags');

export function getAllTags(): Tag[] {
    
    // read all JSON files in the tags directory
    const tagFiles = fs.readdirSync(TAGS_DIRECTORY).filter(file => file.endsWith('.json'));

    // tracks seen IDs
    const seenIDs = new Set<string>();

    // array to hold valid tags
    const tagsList: Tag[] = [];

    // iterate over each tag file
    for (const file of tagFiles){

        // skip template file
        if (file == 'tag-template.json') 
            continue;

        // read file content
        const filePath = path.join(TAGS_DIRECTORY, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");

        // try parse tag
        try {
            const parsedTag = JSON.parse(fileContent);
            const tag = TagSchema.parse(parsedTag);
            
            // validate tag id
            if (!TagIdSchema.test(tag.id)) {
                console.warn(`Invalid TagID format: ${tag.id}`);
                continue;
            }
                    
            // checks if ID already exists
            if (seenIDs.has(tag.id)) {
                console.warn(`Duplicate TagID: ${tag.id} in ${file}. Skipping!`);
                continue;
            }

            tagsList.push(tag);
            seenIDs.add(tag.id);

        } catch (error) {
            console.error(`Error with Tag File ${file}:`, error);
        }

    }

    // return sorted by label alphabetically 
    return tagsList.sort((a, b) => a.label.localeCompare(b.label));

}