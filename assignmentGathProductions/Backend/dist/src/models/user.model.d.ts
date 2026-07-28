import { Document, Model } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
}
declare const UserModel: Model<IUser>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map