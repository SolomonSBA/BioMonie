import fs from 'node:fs';

const s1 = fs.readFileSync('docs/exchange-signature.html', 'utf8');
console.log('Original s1 length:', s1.length);

let s = s1;

// 1. Wordmark 70x31 vs 80x35
s = s.replace('width="80" height="35"', 'width="70" height="31"')
     .replace('width="84"', 'width="74"')
     .replace('width="185"', 'width="195"');
console.log('+ wordmark 70x31:', s.length);

// 2. Heights 185 and 64
s = s.replace('height="171" style="padding:12px"', 'height="185" style="padding:12px 12px 8px"')
     .replace('height="171"', 'height="185"')
     .replace('height="74" style="padding:8px"', 'height="64" style="padding:8px"')
     .replace('height="74"', 'height="64"');
console.log('+ heights 185/64:', s.length);

// 3. Background images
s = s.replace('bgcolor="#1B3A50"><tr><td height="185" style="padding:12px 12px 8px">',
              'bgcolor="#1B3A50" background="https://biomonie.com/email/bg-navy.png"><tr><td height="185" style="padding:12px 12px 8px;background-color:#1B3A50;background-image:url(https://biomonie.com/email/bg-navy.png)">');
s = s.replace('<tr bgcolor="#D9D9D9"><td height="64" style="padding:8px">',
              '<tr bgcolor="#D9D9D9"><td height="64" background="https://biomonie.com/email/bg-grey.png" style="padding:8px;background-color:#D9D9D9;background-image:url(https://biomonie.com/email/bg-grey.png)">');
s = s.replace('<td width="315" bgcolor="#14262F">',
              '<td width="315" height="285" bgcolor="#14262F" background="https://biomonie.com/email/bg-banner.png" style="width:315px;height:285px;background-color:#14262F;background-image:url(https://biomonie.com/email/bg-banner.png);padding:0;line-height:0">');
s = s.replace('style="display:block;border:0"></a></td>',
              'style="display:block;border:0;width:315px;height:285px"></a></td>');
console.log('+ bg images:', s.length);

// 4. TSA on outer table and text tds
s = s.replace('font-family:Arial,sans-serif;', 'font-family:Arial,sans-serif;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;');
s = s.replace('style="color:#fff"', 'style="color:#fff;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"');
s = s.replace('style="font:9px/12px Arial,sans-serif;color:#333;white-space:nowrap"', 'style="font:8px/11px Arial,sans-serif;color:#333;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"');
console.log('+ TSA:', s.length);

// 5. Spans in contact rows
s = s.replace('>%%UserLogonName%%<', '><span style="color:#fff;text-decoration:none">%%UserLogonName%%</span><');
s = s.replace('>%%MobileNumber%%<', '><span style="color:#fff;text-decoration:none">%%MobileNumber%%</span><');
s = s.replace('>www.biomonie.com<', '><span style="color:#fff;text-decoration:none">www.biomonie.com</span><');
console.log('+ Spans:', s.length);

// 6. Company name two lines
s = s.replace('BIOMONIE TECHNOLOGIES<br>LIMITED', '<div style="white-space:nowrap">BIOMONIE TECHNOLOGIES</div><div style="white-space:nowrap">LIMITED</div>');
console.log('+ Company name 2 lines:', s.length);

// 7. Social nowrap lines
s = s.replace('Facebook.com/biomonie | X.com/biomonie<br>Instagram.com/biomonie | Youtube.com/biomonie<br>Linkedin.com/biomonie',
              '<div style="white-space:nowrap">Facebook.com/biomonie | X.com/biomonie</div><div style="white-space:nowrap">Instagram.com/biomonie | Youtube.com/biomonie</div><div style="white-space:nowrap">Linkedin.com/biomonie</div>');
console.log('+ Social nowrap lines:', s.length);

// 8. Contact row nowrap and padding
s = s.replaceAll('style="padding:0 0 4px 6px"', 'style="padding:0 0 6px 6px;white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"');
s = s.replace('style="padding-left:6px"', 'style="padding-left:6px;white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"');
console.log('+ Contact row nowrap and TSA:', s.length);

// 9. Two phones addition
const sTwoPhones = s.replace(
  '<tr><td width="14"><img src="https://biomonie.com/email/icon-web.png"',
  '<tr><td width="14"><img src="https://biomonie.com/email/icon-phone.png" width="14" height="14" alt="Phone" style="display:block;border:0"></td><td style="padding:0 0 6px 6px;white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><a href="tel:%%PhoneNumber%%" style="color:#fff;text-decoration:none"><span style="color:#fff;text-decoration:none">%%PhoneNumber%%</span></a></td></tr><tr><td width="14"><img src="https://biomonie.com/email/icon-web.png"'
);
console.log('Two phones prod length:', sTwoPhones.length);

const sTwoPhonesStaging = sTwoPhones.replaceAll('https://biomonie.com', 'https://biomonie1.onrender.com');
console.log('Two phones staging length:', sTwoPhonesStaging.length);
