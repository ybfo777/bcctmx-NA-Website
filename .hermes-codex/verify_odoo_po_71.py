import os, re, json
from pathlib import Path
from xmlrpc import client as xmlrpc

env_path = Path(r'C:/Users/ZEKUA/AppData/Local/hermes/Profiles/shared/.env')
text = env_path.read_text(encoding='utf-8-sig')
vals = {k: re.search(rf'^{k}=(.*)$', text, re.M).group(1).strip() for k in ['ODOO_BASE_URL','ODOO_DB','ODOO_LOGIN','ODOO_API_KEY']}
common = xmlrpc.ServerProxy(vals['ODOO_BASE_URL'].rstrip('/') + '/xmlrpc/2/common')
uid = common.authenticate(vals['ODOO_DB'], vals['ODOO_LOGIN'], vals['ODOO_API_KEY'], {})
models = xmlrpc.ServerProxy(vals['ODOO_BASE_URL'].rstrip('/') + '/xmlrpc/2/object')
po = models.execute_kw(vals['ODOO_DB'], uid, vals['ODOO_API_KEY'], 'purchase.order', 'read', [[71]], {'fields':['name','state','partner_id','order_line']})
line = models.execute_kw(vals['ODOO_DB'], uid, vals['ODOO_API_KEY'], 'purchase.order.line', 'read', [[82]], {'fields':['name','product_qty','product_id']})
print(json.dumps({'uid': uid, 'purchase_order': po, 'line': line}, indent=2, sort_keys=True))
