import { list, nonNull, nullable, queryField } from "nexus"
import { Project } from "../models/Project"

export const projects = queryField("projects", 
{
    type: nullable(list(nonNull(Project))),
    resolve: async (root, args, ctx) => {
        return null
    }
})

export const project = queryField("projects", 
{
    type: nullable(Project),
    resolve: async (root, args, ctx) => {
        return null
    }
})