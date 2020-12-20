using System;
using System.Threading.Tasks;

namespace MqttClient
{
    public interface IMqttClientProvider<T> : IDisposable
    {
        Task ConnectAsync();
        Task DisconnectAsync();
        Task SubscribeAsync(string topic = "#");
        Task UnsubscribeAsync(string topic = "#");
        Task PublishAsync(T message);
        Action<T> OnMessage { get; set; }
        bool IsConnected { get; }
        bool IsStarted { get; }
    }
}
