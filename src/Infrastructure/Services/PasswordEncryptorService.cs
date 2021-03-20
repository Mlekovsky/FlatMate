using FlatMate_backend.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace FlatMate_backend.Infrastructure.Services
{
    public class PasswordEncryptorService : IPasswordEncryptorService
    {
        public PasswordEncryptorService()
        {
        }

        public string DecryptPasswordWithAes(byte[] password, byte[] Key, byte[] IV)
        {
            string decyptedPassword;

            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.KeySize = Key.Length * 8;

                aesAlg.Key = Key;
                aesAlg.IV = IV;

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msDecrypt = new MemoryStream(password))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {
                            decyptedPassword = srDecrypt.ReadToEnd();
                        }
                    }
                }
            }

            return decyptedPassword;
        }

        public (byte[] encryptedPassword, byte[] IV) EncryptPasswordWithAes(string password, byte[] Key)
        {
            byte[] encryptedPassword;
            byte[] IV;
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.KeySize = Key.Length * 8; //Wielkość klucza uzywanego do szyfrowania może być jedna z trzech - 128/192/256 bitów. Ustawiamy taką wielkosć, która odpowiada dlugości naszego klucza, żeby proces mógł dobrać odpowiedni algorytm

                aesAlg.Key = Key;
                IV = aesAlg.IV;
                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(cryptoStream))
                        {
                            swEncrypt.Write(password);
                        }
                        encryptedPassword = msEncrypt.ToArray();
                    }
                }
            }

            return (encryptedPassword: encryptedPassword, IV: IV);
        }
    }
}
