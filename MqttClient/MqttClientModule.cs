using Autofac;

namespace MqttClient
{
    public class MqttClinetModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(this.ThisAssembly)
              .AsClosedTypesOf(typeof(IMqttClientProvider<>))
              .AsImplementedInterfaces();
        }
    }
}
