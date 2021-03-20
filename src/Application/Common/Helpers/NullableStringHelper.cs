using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Common.Helpers
{
    public static class NullableStringHelper
    {
        public static byte[] GetBytesFromHexString(string hex)
        {
            byte[] result = new byte[hex.Length / 2];
            for (int i = 0; i < result.Length; i++)
            {
                result[i] = Convert.ToByte(hex.Substring(i * 2, 2), 16);
            }

            return result;
        }
    }
}
