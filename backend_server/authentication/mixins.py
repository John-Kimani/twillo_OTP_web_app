from django.conf import settings
from twilio.rest import Client

class MessageHandler:
    phone_number = None
    token = None
    client_email_address = None

    def __init__(self, phone_number) -> None:
        # pass
        self.phone_number = phone_number
        # self.client_email_address = client_email_address
        # self.token = token

    def send_otp_via_message(self):
        client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
        service = client.verify.services(settings.VERIFY_SERVICE)
        result = service.verifications.create(
            to=f'{settings.COUNTRY_CODE}{self.phone_number}',
            channel='sms'
        )
        print(f'Phone: {result.status}')

    def send_otp_via_email(client_email_address):
        client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
        service = client.verify.services(settings.VERIFY_SERVICE)
        result = service.verifications.create(
            to=client_email_address,
            channel='email'
        )
        print(f'Phone: {result.status}')
        return result.status

    def verify_SMS_token(self, token):
        client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
        service = client.verify.services(settings.VERIFY_SERVICE)
        result = service.verification_checks.create(to=f'{settings.COUNTRY_CODE}{self.phone_number}', code=token)

        print(result.status)