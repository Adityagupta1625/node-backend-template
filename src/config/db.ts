import mongoose from 'mongoose'

export const ConnectToMongo = (): void => {
  mongoose
    .connect(process.env.MONGO_URI ?? '', {
      dbName: '',
    })
    .then(() => {
      console.log('connected Succesfully!!')
    })
    .catch((err) => {
      console.log('Error in connecting', err)
    })
}
