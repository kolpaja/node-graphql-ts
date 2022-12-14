import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import { graphqlHTTP } from 'express-graphql';
import 'module-alias/register';
import 'dotenv/config';
import schema from './schemas/schema';
import connectDB from './config/db';

//colors for development
colors.enable();

// The root provides a resolver function for each API endpoint
const rootValue = {
    hello: () => 'Hello world!',
};

// Initialise app
const app: Application = express();

// Connect to mongo db
connectDB();

// Middlewares
app.use(cors());
app.use(
    helmet({
        contentSecurityPolicy:
            process.env.NODE_ENV === 'production' ? undefined : false,
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: process.env.NODE_ENV === 'development',
    })
);
//routes testing
app.get('/', (req: Request, res: Response) => {
    res.send('Hi mom');
});
//App running at Port
const PORT = process.env.PORT || 2022;

app.listen(PORT, () =>
    console.log(
        colors.bold.bgMagenta.underline(`app listening at port ${PORT}`)
    )
);
