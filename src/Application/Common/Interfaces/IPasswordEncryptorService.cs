using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Common.Interfaces
{
    public interface IPasswordEncryptorService
    {
        /// <summary>
        /// Method encrypts given password, and returns encrypted message as byte array
        /// </summary>
        /// <param name="password">Password as plain text</param>
        /// <param name="Key">Secret value from config</param>
        /// <param name="IV">Initialization Vector</param>
        /// <returns>Encrypted password</returns>
        (byte[] encryptedPassword, byte[] IV) EncryptPasswordWithAes(string password, byte[] Key);

        /// <summary>
        /// Method decrypts given password
        /// </summary>
        /// <param name="password">Encrypted password in byte array from</param>
        /// <param name="Key">Secret key from config</param>
        /// <param name="IV">Initialization Vector</param>
        /// <returns>Plain text with decrypted password</returns>
        string DecryptPasswordWithAes(byte[] password, byte[] Key, byte[] IV);


    }
}
