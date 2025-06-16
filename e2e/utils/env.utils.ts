export class EnvConfig {
    private static readonly SITE_URL = 'https://tepcontrol-tst.sminex.com/auth/signin';
    private static readonly USERNAME = process.env.PORTAL_USER || 'testadmin@example.ru';
    private static readonly PASSWORD = process.env.PORTAL_PASS || '0ds9fpFj4efkgqd';

    public static getSiteURL(): string {
        return this.SITE_URL;
    }

    public static getUsername(): string {
        return this.USERNAME;
    }

    public static getPassword(): string {
        return this.PASSWORD;
    }
} 