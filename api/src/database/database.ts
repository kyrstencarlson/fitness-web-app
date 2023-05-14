import * as Mongoose from 'mongoose';

let database: Mongoose.Connection;

export const connect = async () => {
    const uri = process.env.DB_URI;
    if (database) {
        console.error('Database already connected');

        return;
    }
    if (!uri) {
        console.error('DB_URI not found');

        return;
    }
    Mongoose.connect(uri).then(() => {
        database = Mongoose.connection;
        console.log('Connected to database');
    }).catch(error => {
        console.log('Error connecting to database');
        console.error(error);
    });

};

export const disconnect = () => {
    if (!database) {
        console.error('No database connected');

        return;
    }
    Mongoose.disconnect();
};
