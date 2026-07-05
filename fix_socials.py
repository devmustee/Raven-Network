import re

with open("src/components/sections/workspace-hub.tsx", "r") as f:
    content = f.read()

networks = {
    "github": ("https://github.com/", ""),
    "telegram": ("https://t.me/", ""),
    "x": ("https://x.com/", ""),
    "tiktok": ("https://tiktok.com/@", ""),
    "instagram": ("https://instagram.com/", ""),
    "facebook": ("https://facebook.com/", "")
}

# 1. User Profile Card
for net, (prefix, suffix) in networks.items():
    pattern = rf'<span\s+title={{profile\.{net} \? `{net.capitalize()}: \${{profile\.{net}}}` : "{net.capitalize()} Not Linked"}}\s+className={{`p-1\.5 rounded-lg border transition-all \${{\s+profile\.{net} \? "(.*?)" : "(.*?)"\s+}}`}}\s*>'
    
    def repl1(m):
        cls_active = m.group(1)
        cls_inactive = m.group(2)
        return (f'<a \n'
                f'                  href={{profile.{net} ? `{prefix}${{profile.{net}}}{suffix}` : undefined}}\n'
                f'                  target="_blank" rel="noopener noreferrer"\n'
                f'                  title={{profile.{net} ? `{net.capitalize()}: ${{profile.{net}}}` : "{net.capitalize()} Not Linked"}} \n'
                f'                  className={{`block p-1.5 rounded-lg border transition-all ${{profile.{net} ? "{cls_active} hover:scale-105" : "{cls_inactive} cursor-default"}}`}}\n'
                f'                >')
                
    content = re.sub(pattern, repl1, content)
    
    # fix closing tag
    content = content.replace(f'</svg>\n                </span>', f'</svg>\n                </a>')

# 2. Leaderboard List
for net, (prefix, suffix) in networks.items():
    pattern = rf'<span\s+title={{user\.socials\.{net} \? `{net.capitalize()}: \${{user\.socials\.{net}}}` : "{net.capitalize()} Not Linked"}}\s+className={{user\.socials\.{net} \? "(.*?)" : "(.*?)"}}\s*>'
    
    def repl2(m):
        cls_active = m.group(1)
        cls_inactive = m.group(2)
        return (f'<a \n'
                f'                              href={{user.socials.{net} ? `{prefix}${{user.socials.{net}}}{suffix}` : undefined}}\n'
                f'                              target="_blank" rel="noopener noreferrer"\n'
                f'                              onClick={{(e) => user.socials.{net} && e.stopPropagation()}}\n'
                f'                              title={{user.socials.{net} ? `{net.capitalize()}: ${{user.socials.{net}}}` : "{net.capitalize()} Not Linked"}} \n'
                f'                              className={{user.socials.{net} ? "{cls_active} hover:scale-110" : "{cls_inactive} cursor-default"}}\n'
                f'                            >')
                
    content = re.sub(pattern, repl2, content)
    content = content.replace(f'</svg>\n                            </span>', f'</svg>\n                            </a>')

# 3. Viewing User Profile Modal
for net, (prefix, suffix) in networks.items():
    pattern = rf'<div\s+title={{viewingUserProfile\.socials\?\.{net} \? `{net.capitalize()}: \${{viewingUserProfile\.socials\.{net}}}` : "{net.capitalize()} Not Linked"}}\s+className={{`p-2 rounded-xl border transition-all \${{\s+viewingUserProfile\.socials\?\.{net} \? "(.*?)" : "(.*?)"\s+}}`}}\s*>'
    
    def repl3(m):
        cls_active = m.group(1)
        cls_inactive = m.group(2)
        return (f'<a \n'
                f'                  href={{viewingUserProfile.socials?.{net} ? `{prefix}${{viewingUserProfile.socials.{net}}}{suffix}` : undefined}}\n'
                f'                  target="_blank" rel="noopener noreferrer"\n'
                f'                  title={{viewingUserProfile.socials?.{net} ? `{net.capitalize()}: ${{viewingUserProfile.socials.{net}}}` : "{net.capitalize()} Not Linked"}}\n'
                f'                  className={{`block p-2 rounded-xl border transition-all ${{viewingUserProfile.socials?.{net} ? "{cls_active} hover:scale-105" : "{cls_inactive} cursor-default"}}`}}\n'
                f'                >')
                
    content = re.sub(pattern, repl3, content)
    content = content.replace(f'</svg>\n                </div>', f'</svg>\n                </a>')

with open("src/components/sections/workspace-hub.tsx", "w") as f:
    f.write(content)
