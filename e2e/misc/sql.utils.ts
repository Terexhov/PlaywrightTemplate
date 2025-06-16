import sql from 'mssql';


export default class ClientSQL {

    private config: sql.config;

    constructor() {
        this.config = {
            server: 'sfn5',
            database: "SMINEXCommonInformationTEST",
            authentication: {
                type: 'ntlm',
                options: {
                    domain: 'sminex',
                    userName: process.env.PORTAL_USER || "error",
                    password: process.env.PORTAL_PASS || ""
                }
            },
            options: {
                encrypt: true,
                trustServerCertificate: true,
            }
        }
    }

    async createQuery(query: string): Promise<string[]> {
        let pool: sql.ConnectionPool | undefined;
        try {
            pool = await sql.connect(this.config)
            const connection = pool.connect();

            await connection;
            const result = await pool.request().query(query);
            // const names = result.recordset.map(row => row.Name);
            return result;
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Ошибка при запросе:', err.message);
            } else {
                console.error('Неизвестная ошибка:', err);
            }
            return [];
        } finally {
            if (pool) {
                await pool.close();
            }
        }
    }

    async readDepartments(): Promise<string[]> {
        const query = `
            SELECT [ID], [Name], [FullName]
            FROM [SMINEXCommonInformationTEST].[HR].[Divisions]
            WHERE [IsActive] = 1 AND Parent = '00000000-0000-0000-0000-000000000000';
            `
        const data = await this.createQuery(query);
        const result = data.recordset.map(row => row.FullName);
        return result;
    }

    async readAllDivisions(): Promise<string[]> {
        const query = `
            SELECT DISTINCT FullName
            FROM [SMINEXCommonInformationTEST].[HR].[Divisions] as divs
            JOIN [SMINEXCommonInformationTEST].[HR].[Employees] as empl
                ON divs.GUID1C = empl.DivisionGUID
            WHERE divs.IsActive = 1
                AND empl.IsActive = 1

            ORDER BY divs.FullName ASC 
            `
        const data = await this.createQuery(query);
        const result = data.recordset.map(row => row.FullName);
        return result;
    }
    

    async readEmployees(): Promise<string[]> {
        const query = `
            SELECT [ID], [Name], [FullName]
            FROM [SMINEXCommonInformationTEST].[HR].[Divisions]
            WHERE [IsActive] = 1 AND Parent = '00000000-0000-0000-0000-000000000000';
            `
        return await this.createQuery(query);
    }
}