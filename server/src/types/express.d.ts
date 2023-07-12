

    declare namespace Express {

    export interface User {
        _id: Mongoose.Types.ObjectId;
    }
    
    export interface Request {
        user?: User;
    }

  }


