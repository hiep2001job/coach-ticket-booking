using coach_ticket_booking_api.DTOs.Email;
using coach_ticket_booking_api.Helper;
using Mailjet.Client;
using Mailjet.Client.Resources;
using Mailjet.Client.TransactionalEmails;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

namespace coach_ticket_booking_api.Services.Mail
{
    public class MailjetMailService:IMailService 
    {
        private readonly MailjetSettings _mailjetSettings;
        private readonly MailAddressSettings _mailAddress;

        public MailjetMailService(IOptions<MailjetSettings> mailjetSettings, IOptions<MailAddressSettings> mailAddress)
        {
            _mailjetSettings = mailjetSettings.Value;
            _mailAddress = mailAddress.Value;
        }

        public async Task SendEmailAsync(EmailDto emailDto)
        {
            var client = new MailjetClient(_mailjetSettings.ApiKey, _mailjetSettings.ApiSecret);
            var request = new TransactionalEmailBuilder()
                .WithFrom(new SendContact(_mailAddress.Mail, _mailAddress.Name))
                .WithSubject(emailDto.Subject)
                .WithHtmlPart(emailDto.Message)
                .WithTo(new SendContact(emailDto.ToMail,emailDto.ToName))
                .Build();

            await client.SendTransactionalEmailAsync(request);
        }

        public async Task<string> SendEmailWithTemplateAsync(EmailWithTemplateDto emailDto)
        {
            var client = new MailjetClient(_mailjetSettings.ApiKey, _mailjetSettings.ApiSecret);

            var message = new TransactionalEmail
            {
                From = new SendContact(_mailAddress.Mail,_mailAddress.Name),
                To = new List<SendContact> { new SendContact(emailDto.ToMail, emailDto.ToName) },
                TemplateID = emailDto.TemplateId,
                TemplateLanguage = true,
                Subject = emailDto.Subject,
                Variables = emailDto.TemplateVariables // Replace placeholders in the template with actual values
            };

            var response = await client.SendTransactionalEmailAsync(message);

            return response.Messages[0].Status;
           
        }
    }
}
