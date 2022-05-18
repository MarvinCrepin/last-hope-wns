import { mutationField, nullable } from "nexus";
import { Project } from "../models/Project";

export const createProject = mutationField("createProject", {
    type: nullable(Project),
    resolve: async (root, args, ctx) => {
        return null
    }
})

export const removeProject = mutationField("removeProject", {
    type: nullable(Project),
    resolve: async (root, args, ctx) => {
        return null
    }
})
