import { DataSource } from 'typeorm'

const {
	DB_HOST,
	DB_PORT = 5432,
	DB_USERNAME,
	DB_PASSWORD
} = process.env

const AppDataSource = new DataSource({
	type: 'postgres',
	host: DB_HOST,
	port: +DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: "",
	entities: ["./**/model.ts"],
	logging: true,
	synchronize: true,
	extra: {
		ssl: {
			rejectUnauthorized: false
		}
	}
})

export default AppDataSource
