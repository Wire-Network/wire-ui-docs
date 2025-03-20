# Deployment Configuration

This directory contains configuration files for deploying the Wire UI Docs site.

## Nginx Configuration

The `nginx.conf` file contains the Nginx configuration for serving the Wire UI Docs site with SSL support. To use this configuration:

1. Install required packages:

   ```bash
   sudo apt update
   sudo apt install nginx certbot python3-certbot-nginx
   ```

2. Copy the Nginx configuration:

   ```bash
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/wire-ui-docs
   sudo ln -s /etc/nginx/sites-available/wire-ui-docs /etc/nginx/sites-enabled/
   ```

3. Update the configuration:

   - Replace `ui.wire.foundation` with your domain
   - Update SSL certificate paths to match your domain
   - Adjust security headers as needed

4. Test and reload Nginx:

   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. Obtain SSL certificate:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Systemd Service

The `wire-ui-docs.service` file configures the http-server as a systemd service. To use it:

1. Copy the service file:

   ```bash
   sudo cp deploy/wire-ui-docs.service /etc/systemd/system/
   ```

2. Update the service file:

   - Adjust the `WorkingDirectory` path to match your installation
   - Update the `User` if needed

3. Enable and start the service:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable wire-ui-docs
   sudo systemctl start wire-ui-docs
   ```

4. Check the service status:
   ```bash
   sudo systemctl status wire-ui-docs
   ```

## Security Considerations

- The Content Security Policy (CSP) is configured to be permissive to allow Storybook to function properly. Consider tightening it based on your security requirements.
- HSTS is disabled by default. Enable it only if you're sure about HTTPS-only access.
- Review and adjust security headers based on your needs.
