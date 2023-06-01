from django.conf import settings
from twilio.rest import Client
import random

class MessageHandler:
    phone_number = None

    def __init__(self, phone_number) -> None:
        self.phone_number = phone_number

    def send_otp_via_message(self):
        client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
        service = client.verify.services(settings.VERIFY_SERVICE)
        service.verifications.create(
            to=f'{settings.COUNTRY_CODE}{self.phone_number}',
            channel='sms'
        )

    def send_otp_via_email(self, email):
        client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
        service = client.verify.services(settings.VERIFY_SERVICE)
        service.verifications.create(
            to=email,
            channel='email'
        )

    def verify_token(self, phone_number, token):
        client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
        service = client.verify.services(settings.VERIFY_SERVICE)
        result = service.verification_checks.create(to=phone_number, code=token)

        print(result.status)