# MongoDB Connection Timeout Fix

## ✅ Changes Made

### 1. **Updated MongoDB Connection String**
Added database name and connection parameters to `.env`:
```
MONGODB_URI=mongodb+srv://keshavgupta86036:FST2023k@cluster0.06aqope.mongodb.net/jobportal?retryWrites=true&w=majority
```

### 2. **Improved Connection Pooling**
Updated `lib/mongodb.ts` with:
- **Connection caching** - Reuses connections instead of creating new ones
- **Better timeout settings** - Increased timeouts to handle slow networks
- **Connection pooling** - Min 2, Max 10 connections
- **Development mode optimization** - Preserves connection across hot reloads

### 3. **Connection Settings**
```typescript
{
  maxPoolSize: 10,           // Maximum connections
  minPoolSize: 2,            // Minimum connections
  maxIdleTimeMS: 30000,      // 30 seconds idle timeout
  serverSelectionTimeoutMS: 10000,  // 10 seconds to select server
  socketTimeoutMS: 45000,    // 45 seconds socket timeout
  connectTimeoutMS: 10000,   // 10 seconds to connect
}
```

## 🔧 Additional Troubleshooting Steps

### If Still Getting Timeout Errors:

#### 1. **Check MongoDB Atlas IP Whitelist**
- Go to MongoDB Atlas Dashboard
- Navigate to Network Access
- Add your current IP address or use `0.0.0.0/0` for development (allows all IPs)

#### 2. **Check Internet Connection**
```bash
# Test DNS resolution
nslookup cluster0.06aqope.mongodb.net

# Test connectivity
ping cluster0.06aqope.mongodb.net
```

#### 3. **Restart Development Server**
```bash
# Stop the current server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

#### 4. **Check Firewall/VPN**
- Disable VPN temporarily
- Check if firewall is blocking MongoDB ports (27017)
- Try from a different network

#### 5. **Verify MongoDB Atlas Cluster Status**
- Check if cluster is paused (free tier clusters pause after inactivity)
- Go to MongoDB Atlas → Clusters → Resume if paused

#### 6. **Test Connection Directly**
Create a test file `test-connection.js`:
```javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://keshavgupta86036:FST2023k@cluster0.06aqope.mongodb.net/jobportal?retryWrites=true&w=majority';

async function testConnection() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('✅ Connected successfully!');
    await client.db().command({ ping: 1 });
    console.log('✅ Ping successful!');
  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await client.close();
  }
}

testConnection();
```

Run: `node test-connection.js`

## 🚀 What Should Work Now

After these changes:
- ✅ Connections are reused (no more connection pool exhaustion)
- ✅ Better timeout handling (handles slow networks)
- ✅ Development mode optimized (faster hot reloads)
- ✅ Proper error messages (easier debugging)

## 📝 Notes

- The connection is now cached and reused across requests
- In development, the connection persists across hot reloads
- Timeout errors should be significantly reduced
- If you still see errors, follow the troubleshooting steps above

## 🔄 Next Steps

1. **Restart your development server** (important!)
2. **Clear browser cache** and refresh
3. **Test the blog page** at `/blog/testing`
4. **Check MongoDB Atlas** to ensure cluster is active

If issues persist, the problem is likely:
- Network/firewall blocking MongoDB
- MongoDB Atlas IP whitelist restrictions
- Cluster paused or unavailable
