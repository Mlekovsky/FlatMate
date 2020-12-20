using System;
using System.Runtime.Serialization;

namespace MqttClient.Exceptions
{
    /// <summary>
    /// The exception that is thrown when <see cref="IMqttClientProvider{T}"/> cannot establish connection with broker.
    /// </summary>
    [Serializable]
    public class MqttConnectionException : Exception
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MqttConnectionException"/> class.
        /// </summary>
        public MqttConnectionException() : base()
        { }

        /// <summary>
        /// Initializes a new instance of the <see cref="MqttConnectionException"/> class with serialized data.
        /// </summary>
        /// <param name="info">The <see cref="SerializationInfo"/> that holds the serialized object data about the exception being thrown.</param>
        /// <param name="context">The <see cref="StreamingContext"/> that contains contextual information about the source or destination.</param>
        public MqttConnectionException(SerializationInfo info, StreamingContext context) : base(info, context)
        { }

        /// <summary>
        /// Initializes a new instance of the <see cref="MqttConnectionException"/> class with the specified error message.
        /// </summary>
        /// <param name="message">The message that describes the error.</param>
        public MqttConnectionException(string message) : base(message)
        { }

        /// <summary>
        /// Initializes a new instance of the <see cref="MqttConnectionException"/> class with a specified error message and a reference to the inner exception that is the cause of this exception.
        /// </summary>
        /// <param name="message">The message that describes the error.</param>
        /// <param name="innerException">The inner exception reference.</param>
        public MqttConnectionException(string message, Exception innerException) : base(message, innerException)
        { }
    }
}
