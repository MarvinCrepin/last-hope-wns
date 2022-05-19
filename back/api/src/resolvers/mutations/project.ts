async function createProject(parent, data ctx, info) {
    return ctx.db.mutation.createPost(
      {
      data: {
          ...data
      },
      info,
    )
  }
  
  async function deleteProject(parent, { id }, ctx, info) {
    return ctx.db.mutation.updateProject({ where: { id } }, info)
  }
  
  async function updateProject(parent, data, ctx, info) {
    return ctx.db.mutation.updateProject(
      {
        where: { id: data.id },
        data: { ...data }
      },
      info,
    )
  }
  
  module.exports = {
    createProject,
    deleteProject,
    updateProject,
  }