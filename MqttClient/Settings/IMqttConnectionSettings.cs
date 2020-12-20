namespace MqttClient.Settings
{
    public interface IMqttConnectionSettings
    {
        /// <summary>
        /// Address of the MQTT broker.
        /// </summary>
        public string Address { get; set; }
        
        /// <summary>
        /// Port used to connect to the MQTT broker.
        /// </summary>
        public int Port { get; set; }

        /// <summary>
        /// Username required when connecting to secured broker.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Password required when connection to secured broker.
        /// </summary>
        public string Password { get; set; }

        public int CommunicationTimeout { get; set; }

        public int KeepAlivePeriod { get; set; }
    }
}
