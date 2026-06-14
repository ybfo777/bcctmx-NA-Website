import sys
from importlib.util import spec_from_file_location, module_from_spec
from pathlib import Path
from email.message import EmailMessage

path = Path(r'C:/Users/ZEKUA/AppData/Local/hermes/Profiles/shared/scripts/release_email_watcher.py')
spec = spec_from_file_location('release_email_watcher', path)
mod = module_from_spec(spec)
sys.modules[spec.name] = mod
spec.loader.exec_module(mod)

msg = EmailMessage()
msg['From'] = 'Tracy Moose <tracy.moose@commscope.com>'
msg['Subject'] = 'Release: 2 loads of 0.143 wire'
msg['Date'] = 'Sat, 13 Jun 2026 10:15:00 -0600'
msg.set_content('Zac, please release 2 loads of 0.143 wire.\n\nHave a wonderful weekend!')
parsed = mod.ParsedMail(uid='999', message_id='<test-release-999>', sender=mod.decode_mime(msg['From']), subject=mod.decode_mime(msg['Subject']), body=mod.get_text_from_message(msg), date_text=mod.decode_mime(msg['Date']))
classification = mod.classify(parsed)
print(mod.format_notification(parsed, classification) if classification else 'NO MATCH')
