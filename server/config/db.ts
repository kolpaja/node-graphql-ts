import colors from 'colors';
import { connect } from 'mongoose';

const connectDB = async () => {
    const { MONGO_URI } = process.env;
    const connection = await connect(`${MONGO_URI}`);
    console.log(
        colors.bgWhite.green.bold(
            `MongoDb Connected: ${connection.connection.host}`
        )
    );
};

export default connectDB;
