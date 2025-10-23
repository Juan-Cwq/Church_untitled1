#!/bin/bash

# Database Stats CLI Tool
# Quick way to check database from terminal

echo "╔════════════════════════════════════════════════╗"
echo "║   📊 Connection Hub - Database Stats          ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Server is not running. Start it with: npm start"
    exit 1
fi

echo "📈 Statistics:"
echo "─────────────────────────────────────────────────"
curl -s http://localhost:3000/api/admin/stats | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    stats = data['stats']
    print(f\"  Total Users:      {stats['totalUsers']}\")
    print(f\"  Active Users:     {stats['activeUsers']}\")
    print(f\"  Today's Signups:  {stats['todaySignups']}\")
    print(f\"  Today's Logins:   {stats['todayLogins']}\")
else:
    print('  Error fetching stats')
"

echo ""
echo "👥 Recent Users:"
echo "─────────────────────────────────────────────────"
curl -s http://localhost:3000/api/admin/users | python3 -c "
import sys, json
from datetime import datetime

data = json.load(sys.stdin)
if data.get('success') and data.get('users'):
    users = data['users'][:5]  # Show last 5 users
    for user in users:
        name = f\"{user['first_name']} {user['last_name']}\"
        email = user['email']
        created = datetime.fromisoformat(user['created_at'].replace('Z', '+00:00')).strftime('%Y-%m-%d')
        status = '✅' if user['is_active'] else '❌'
        print(f\"  {status} {name:20} {email:30} {created}\")
    
    if len(data['users']) > 5:
        print(f\"  ... and {len(data['users']) - 5} more users\")
else:
    print('  No users found')
"

echo ""
echo "─────────────────────────────────────────────────"
echo "💻 Open admin dashboard: open http://localhost:3000/admin.html"
echo ""
