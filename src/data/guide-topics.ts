export const guideTopics=[
 {id:'guide-devices',name:'设备入门',intro:'按系统准备客户端，确认权限与连接方式。',icon:'01',ids:['windows','macos','android','ios','linux']},
 {id:'guide-import',name:'配置导入',intro:'分清链接、二维码和配置文件，再完成首次导入。',icon:'02',ids:['subscription-import','qr-import','wireguard-windows','wireguard-android','openvpn-connect']},
 {id:'guide-connection',name:'连接与分流',intro:'核对系统代理、浏览器设置和应用分流边界。',icon:'03',ids:['windows-system-proxy','macos-proxy-settings','android-always-on','firefox-proxy','mullvad-split-tunneling']},
 {id:'guide-troubleshoot',name:'故障排查',intro:'从基础网络、时间与DNS逐步缩小问题范围。',icon:'04',ids:['troubleshooting','dns-check','network-time-check','hotel-wifi-login','wifi-cellular-handoff']},
 {id:'guide-maintenance',name:'日常维护',intro:'管理流量、配置更新、设备与备份。',icon:'05',ids:['traffic-reset-check','subscription-refresh','device-limit-review','client-update','configuration-backup']},
 {id:'guide-privacy',name:'隐私与退出',intro:'整理脱敏记录，处理凭据、更换配置与退出恢复。',icon:'06',ids:['logs-redaction','subscription-link-reset','disconnect-restore','remove-vpn-profile','ipv6-connection-check']}
] as const;
