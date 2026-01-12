// graphql/resolvers.js
export const resolvers = {
  Query: {
    getRoles: async (parent, args, { db }) => {
      // db.models.Role or the imported Role model
      return await db.models.Role.findAll();
    },

    // Get currently logged in user
    me: async (parent, args, { db, user }) => {
      if (!user) throw new Error('Not authenticated');
      
      return await db.models.User.findByPk(user.id, {
        include: [{ model: db.models.Role }]
      });
    }
  },

  User: {
    // Nested resolver to fetch the Role if not eager-loaded
    role: async (user) => {
      return await user.getRole();
    }
  }
};