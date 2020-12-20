using MqttClient.Exceptions;
using MqttClient.Settings;
using MQTTnet;
using MQTTnet.Client.Connecting;
using MQTTnet.Client.Disconnecting;
using MQTTnet.Client.Options;
using MQTTnet.Client.Receiving;
using MQTTnet.Extensions.ManagedClient;
using System;
using System.Text;
using System.Threading.Tasks;

namespace MqttClient
{
    public abstract class BaseMqttClientProvider<T> : IMqttClientProvider<T>
    {
        public Action<T> OnMessage { get; set; }
        public bool IsConnected => throw new NotImplementedException();
        public bool IsStarted => throw new NotImplementedException();

        protected abstract string TopicPrefix { get; }

        private readonly IManagedMqttClientOptions mqttOptions;
        private readonly IManagedMqttClient mqttClient;
        private bool disposedValue;

       
        protected BaseMqttClientProvider(IMqttConnectionSettings settings)
        {
            mqttOptions = new ManagedMqttClientOptions()
            {
                ClientOptions = new MqttClientOptions
                {
                    ClientId = $"{nameof(T)}_{Guid.NewGuid()}",
                    Credentials = new MqttClientCredentials
                    {
                        Username = settings.Username,
                        Password = Encoding.ASCII.GetBytes(settings.Password)
                    },
                    ProtocolVersion = MQTTnet.Formatter.MqttProtocolVersion.V311,
                    CleanSession = true,
                    CommunicationTimeout = TimeSpan.FromSeconds(settings.CommunicationTimeout),
                    KeepAlivePeriod = TimeSpan.FromSeconds(settings.KeepAlivePeriod),
                    ChannelOptions = new MqttClientTcpOptions
                    {
                        Server = settings.Address,
                        Port = settings.Port
                    }
                }
            };

            mqttClient = new MqttFactory().CreateManagedMqttClient();
            mqttClient.ConnectedHandler = new MqttClientConnectedHandlerDelegate(OnClientConnected);
            mqttClient.DisconnectedHandler = new MqttClientDisconnectedHandlerDelegate(OnClientDisconnected);
            mqttClient.ConnectingFailedHandler = new ConnectingFailedHandlerDelegate(OnConnectingFailed);
            mqttClient.ApplicationMessageReceivedHandler = new MqttApplicationMessageReceivedHandlerDelegate(OnClientMessageReceived);
        }


        public async Task ConnectAsync()
        {
            await mqttClient.StartAsync(mqttOptions);
        }
        public async Task DisconnectAsync()
        {
            await mqttClient.StopAsync();
        }
        public void Dispose()
        {
            Task.Run(() => Dispose(disposing: true))
                .ContinueWith(t => GC.SuppressFinalize(this));
        }


        public abstract Task PublishAsync(T message);
        public abstract Task SubscribeAsync(string topic = "#");
        public abstract Task UnsubscribeAsync(string topic = "#");


        protected abstract void OnClientMessageReceived(MqttApplicationMessageReceivedEventArgs obj);
        private void OnClientConnected(MqttClientConnectedEventArgs obj)
        {
        }
        private async Task OnClientDisconnected(MqttClientDisconnectedEventArgs obj)
        {
            await mqttClient.StartAsync(mqttOptions);
        }
        private void OnConnectingFailed(ManagedProcessFailedEventArgs obj)
        {
            throw new MqttConnectionException("Cannot connect to the MQTT broker.", obj.Exception);
        }


        private async Task Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    if (mqttClient.IsStarted)
                        await mqttClient.StopAsync();

                    mqttClient.Dispose();
                }

                disposedValue = true;
            }
        }
    }
}
