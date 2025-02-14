// In model file (e.g., user.ts)
export default (sequelize: any, DataTypes: any) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return User;
};
