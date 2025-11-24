# Check if script is run as root
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

# Check if certbot is installed
if ! [ -x "$(command -v certbot)" ]; then
    # Install certbot
    apt-get update && apt-get upgrade -y
    apt-get install snapd -y
    snap install core
    snap install certbot --classic
    ln -s /snap/bin/certbot /usr/bin/certbot
fi

if [ -z "$1" ]
    then
        echo "Enter domain name:"
        read domain

        # else use the first argument as domain name
    else
        domain=$1
fi
# # Get domain name


sudo certbot --manual --preferred-challenges dns certonly -d $domain --agree-tos --no-eff-email

cp /etc/letsencrypt/live/$domain/fullchain.pem ./certs/cert.pem
cp /etc/letsencrypt/live/$domain/privkey.pem ./certs/key.pem