const { models, runDbOperation } = require('../../config/database');

async function findAllBlogs() {
  return runDbOperation(
    () => models.Blog.findAll({ order: [['id', 'DESC']] }),
    { module: 'blog.repository', action: 'findAllBlogs' }
  );
}

async function findBlogById(id) {
  return runDbOperation(
    () => models.Blog.findByPk(id),
    { module: 'blog.repository', action: 'findBlogById', id }
  );
}

async function createBlog(data) {
  return runDbOperation(
    () => models.Blog.create({
      imagen: data.imagen,
      titulo: data.titulo,
      autor: data.autor,
      descripcion: data.descripcion,
      contenido: data.contenido
    }),
    { module: 'blog.repository', action: 'createBlog' }
  );
}

async function updateBlog(id, data) {
  return runDbOperation(async () => {
    const existing = await models.Blog.findByPk(id);
    if (!existing) {
      return null;
    }

    await existing.update({
      imagen: data.imagen,
      titulo: data.titulo,
      autor: data.autor,
      descripcion: data.descripcion,
      contenido: data.contenido
    });
    return existing;
  }, { module: 'blog.repository', action: 'updateBlog', id });
}

async function deleteBlog(id) {
  return runDbOperation(async () => {
    const deletedCount = await models.Blog.destroy({ where: { id } });
    return deletedCount > 0 ? { id } : null;
  }, { module: 'blog.repository', action: 'deleteBlog', id });
}

module.exports = {
  findAllBlogs,
  findBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
