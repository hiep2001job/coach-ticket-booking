using System.Text;

namespace coach_ticket_booking_api.Utils
{
    public static class StringGenerator
    {
        public static string GenerateRandomString(int length)
        {
            const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            StringBuilder stringBuilder = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int index = random.Next(characters.Length);
                char randomChar = characters[index];
                stringBuilder.Append(randomChar);
            }

            return stringBuilder.ToString();
        }

        public static string GenerateRandomDigitString(int length)
        {
            const string digits = "0123456789";
            Random random = new Random();
            StringBuilder stringBuilder = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int index = random.Next(digits.Length);
                char randomDigit = digits[index];
                stringBuilder.Append(randomDigit);
            }

            return stringBuilder.ToString();
        }
    }
}
