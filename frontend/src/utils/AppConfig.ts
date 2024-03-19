class AppConfig {
    public baseUrl = 'http://localhost:8080/api';
    public groupsUrl = `${this.baseUrl}/groups`;
    public appointmentsUrl = `${this.baseUrl}/appointments`;
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 6000;
}

const appConfig = new AppConfig();
export default appConfig;