#!/bin/bash
# Clear CloudFlare cache for tomanistor.com

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/8dbf05517a9d7fea816548248465f5a8/purge_cache" \
-H "X-Auth-Email: tuan09041994@gmail.com" \
-H "X-Auth-Key: c0f1e80b14b47481fdedfb2b74b53f1405b5a" \
-H "Content-Type:application/json" \
--data '{"purge_everything":true}'

echo "CloudFlare cache has been cleared"