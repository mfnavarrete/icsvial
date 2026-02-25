const { ERROR_CODES, ERROR_MESSAGES } = require('../../constants/errors');
const { AppError } = require('../../utils/app-error');
const { validateRequiredFields } = require('../../utils/validation');
const repository = require('./blog.repository');

const REQUIRED_FIELDS = ['imagen', 'titulo', 'autor', 'descripcion', 'contenido'];

async function listBlogs() {
  return repository.findAllBlogs();
}

async function getBlogById(id) {
  const blog = await repository.findBlogById(id);
  if (!blog) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_BLOG,
      code: ERROR_CODES.NOT_FOUND_BLOG,
      status: 404,
      context: {
        module: 'blog.service',
        action: 'getBlogById',
        id
      }
    });
  }

  return blog;
}

async function createBlog(payload) {
  validateRequiredFields(payload, REQUIRED_FIELDS);
  return repository.createBlog(payload);
}

async function updateBlog(id, payload) {
  validateRequiredFields(payload, REQUIRED_FIELDS);

  const updated = await repository.updateBlog(id, payload);
  if (!updated) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_BLOG,
      code: ERROR_CODES.NOT_FOUND_BLOG,
      status: 404,
      context: {
        module: 'blog.service',
        action: 'updateBlog',
        id
      }
    });
  }

  return updated;
}

async function removeBlog(id) {
  const deleted = await repository.deleteBlog(id);
  if (!deleted) {
    throw new AppError({
      message: ERROR_MESSAGES.NOT_FOUND_BLOG,
      code: ERROR_CODES.NOT_FOUND_BLOG,
      status: 404,
      context: {
        module: 'blog.service',
        action: 'removeBlog',
        id
      }
    });
  }
}

module.exports = {
  listBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  removeBlog
};
