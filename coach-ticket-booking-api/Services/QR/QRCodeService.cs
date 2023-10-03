using ZXing.Common;
using ZXing.QrCode;
using ZXing;
using System.Drawing;

namespace coach_ticket_booking_api.Services.QR
{
    public class QRCodeService : IQRCodeService
    {
        public void GenerateQRCode()
        {
            // Text to encode in the QR code
            string textToEncode = "https://www.example.com";

            // Create a QR code writer
            BarcodeWriter<Bitmap> barcodeWriter = new BarcodeWriter<Bitmap>();
            barcodeWriter.Format = BarcodeFormat.QR_CODE;

            // Set encoding options (optional)
            EncodingOptions encodingOptions = new QrCodeEncodingOptions
            {
                DisableECI = true, // Disable Extended Channel Interpretation
                CharacterSet = "UTF-8", // Character set
                Width = 300, // Width of the QR code image
                Height = 300, // Height of the QR code image
            };

            barcodeWriter.Options = encodingOptions;

            // Generate a QR code bitmap
            Bitmap qrCodeBitmap = barcodeWriter.Write(textToEncode);

        }
    }
}
