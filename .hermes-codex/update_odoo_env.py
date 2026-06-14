from pathlib import Path

path = Path(r'C:/Users/ZEKUA/AppData/Local/hermes/Profiles/shared/.env')
text = path.read_text(encoding='utf-8-sig')
needle = 'EMAIL_HOME_ADDRESS=zekuanzhang@baichuanchina.com'
block = '\n'.join([
    'ODOO_BASE_URL=https://bc-special-wire-co-llc.odoo.com',
    'ODOO_DB=bc-special-wire-co-llc',
    'ODOO_LOGIN=zekuanzhang@baichuanchina.com',
    'ODOO_API_KEY=ac7c9f9fff589c9b66c73545f7bef0568f699761',
    'ODOO_TEMPLATE_ORDER_ID=69',
    'COMMSCOPE_TEMPLATE_ORDER_ID=69',
    'ODOO_LINE_MATCH_HINT=0.143',
    needle,
])
if 'ODOO_BASE_URL=https://bc-special-wire-co-llc.odoo.com' not in text:
    if needle not in text:
        raise SystemExit('needle not found')
    text = text.replace(needle, block, 1)
    path.write_text(text, encoding='utf-8-sig')
    print('updated')
else:
    print('already-updated')
