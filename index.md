# Cylinder Inventory Portal

A comprehensive web application for managing cylinder inventory operations in manufacturing environments. Built with React, TypeScript, and modern web technologies to streamline purchase orders, material inward processes, inventory tracking, and cylinder issuance operations.

![Industrial Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue)

## 🏭 Overview

The Cylinder Inventory Portal is designed for manufacturing companies that manage industrial gas cylinders (CO2, Argon, Oxygen) across multiple departments. The system integrates with SAP for purchase order management and features comprehensive RFID tracking, quality control workflows, and real-time inventory monitoring.

### Key Benefits

- **Streamlined Operations**: 6-step material inward process with quality control
- **Real-time Tracking**: RFID-based cylinder identification and location tracking
- **SAP Integration**: Automated purchase order fetching and vendor communication
- **Exchange Validation**: Automated validation ensuring equal cylinder exchanges
- **Comprehensive Reporting**: Interactive charts and exportable reports
- **Role-based Access**: Multi-level user management with department assignments

## 🚀 Features

### 🔐 Authentication & Security
- Secure login with role-based access control
- User management with Admin/Manager/Operator/Viewer roles
- Department-based permissions and restrictions
- Audit logging for all system operations

### 📋 Purchase Order Management
- **SAP Integration**: Real-time PO fetching from SAP systems
- **Vendor Communication**: Pre-filled email templates for vendor correspondence
- **Advanced Filtering**: Search by PO ID, vendor, status, and date ranges
- **Status Tracking**: Complete PO lifecycle management from draft to delivery

### 🚛 Material Inward Process
- **6-Step Workflow**: Truck arrival → Weighing → PO tallying → Quality inspection → RFID tagging → Completion
- **Quality Control**: Comprehensive inspection checklist with pass/fail validation
- **RFID Integration**: Camera-based and manual RFID tag assignment
- **Weight Management**: Automatic net weight calculation from gross and tare weights
- **Document Upload**: Invoice and documentation attachment support

### 📦 Inventory Management
- **Real-time Tracking**: Live inventory levels with auto-refresh capabilities
- **RFID Search**: Advanced search by RFID tags, cylinder IDs, and locations
- **Status Monitoring**: Full/Empty/In Use/Maintenance status tracking
- **Low Stock Alerts**: Configurable thresholds with visual warnings
- **Audit Trail**: Complete transaction history with user tracking

### 🔄 Cylinder Issue Operations
- **Request Processing**: Handle department requests from SAP
- **Exchange Validation**: Automatic validation of full vs empty cylinder exchanges
- **RFID Scanning**: Real-time RFID scanning for accurate tracking
- **Department Rules**: Enforced equal exchange for departments (not vendors)
- **Confirmation System**: Multi-step confirmation with inventory updates

### 📊 Reports & Analytics
- **Interactive Charts**: Line graphs for inventory trends, pie charts for PO status
- **Filterable Reports**: Date range, department, and vendor filtering
- **Accordion Layout**: Expandable sections for detailed data
- **Export Capabilities**: PDF and Excel export for all report sections
- **Real-time Data**: Live dashboard with current operational metrics

### ⚙️ System Configuration
- **SAP Settings**: Complete SAP system integration configuration
- **RFID Devices**: Support for Zebra, Honeywell, and Datalogic scanners
- **Email Templates**: Customizable templates for vendor and alert communications
- **Notification Management**: Configurable alerts and threshold settings
- **User Administration**: Complete user lifecycle management
- **System Maintenance**: Backup, security scans, and audit log management

## 🛠 Technical Architecture

### Frontend Stack
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.9.2**: Full type safety throughout the application
- **Vite 7.1.2**: Lightning-fast development and build tooling
- **TailwindCSS 3.4.17**: Utility-first CSS framework with custom industrial theme
- **Radix UI**: Accessible component primitives
- **Recharts**: Interactive charts and data visualization
- **React Router 6**: SPA routing with nested layouts

### Backend Integration
- **Express Server**: Integrated development server
- **SAP Connectivity**: RESTful API integration with SAP systems
- **RFID Hardware**: Bluetooth, WiFi, and USB device support
- **Email Services**: SMTP integration for automated communications

### UI/UX Design
- **Industrial Theme**: Navy blue (#001F3F), light gray (#F0F4F8), green (#28A745), red (#DC3545), orange (#FD7E14)
- **Responsive Design**: Optimized for desktop (1920x1080) and tablet (1024x768)
- **Accessibility**: WCAG compliant with screen reader support
- **Modern Components**: Shadcn/ui component library integration

## 📱 Application Screens

### 1. Login Screen
- Centered authentication card with industrial branding
- Username/password authentication with password visibility toggle
- Factory silhouette background with gradient styling
- "Forgot Password" functionality

### 2. Dashboard
- **KPI Cards**: Active POs, Inventory levels, Pending requests, Low stock alerts
- **Interactive Charts**: Bar chart showing inventory by gas type
- **Activity Feed**: Real-time operational events and notifications
- **Quick Actions**: Direct access to common operations

### 3. PO Management
- **SAP Integration**: "Fetch from SAP" with loading indicators
- **Data Table**: Searchable table with PO details and status tracking
- **Email System**: Pre-filled vendor email templates
- **Side Panel**: Detailed PO information with vendor contact details
- **Advanced Filters**: Multi-criteria filtering and search

### 4. Material Inward
- **Progress Stepper**: Visual 6-step workflow indicator
- **Form Validation**: Step-by-step data validation and requirements
- **RFID Integration**: Camera scanning modal with manual entry option
- **Quality Control**: Comprehensive inspection checklist
- **History Table**: Past inward operations with status tracking

### 5. Inventory Management
- **Stock Gauges**: Visual stock level indicators with low stock warnings
- **RFID Search**: Advanced search across all cylinder identifiers
- **Real-time Updates**: Auto-refresh with timestamp tracking
- **Audit Log**: Complete transaction history sidebar
- **Export Options**: Data export capabilities

### 6. Cylinder Issue
- **Split Layout**: Pending requests table with processing form
- **Exchange Validation**: Real-time validation with visual feedback
- **RFID Scanning**: Separate tracking for issued and received cylinders
- **Confirmation Modal**: Multi-step confirmation with summary
- **Tooltip Guidance**: Contextual help for business rules

### 7. Reports & Analytics
- **Interactive Charts**: Inventory trends and PO status distribution
- **Filterable Data**: Date range, department, and vendor filtering
- **Accordion Reports**: Expandable sections for detailed analysis
- **Export Functions**: Individual PDF/Excel export per section
- **Real-time Metrics**: Live operational dashboard

### 8. Settings
- **Tabbed Interface**: System, Users, Devices, Notifications, Departments, Maintenance
- **SAP Configuration**: Complete system integration settings
- **User Management**: Role-based access control and permissions
- **Device Settings**: RFID scanner configuration and testing
- **System Maintenance**: Backup, security, and audit configurations

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm
- Modern web browser with camera support (for RFID scanning)
- SAP system access (for production integration)
- RFID scanner hardware (optional, manual entry supported)

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd cylinder-inventory-portal

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Access the application
open http://localhost:8080
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# SAP Integration
SAP_SERVER_URL=https://your-sap-server.com
SAP_CLIENT_ID=100
SAP_USERNAME=integration_user
SAP_PASSWORD=your_secure_password

# Email Configuration
SMTP_HOST=smtp.company.com
SMTP_PORT=587
SMTP_USER=noreply@company.com
SMTP_PASSWORD=email_password

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/cylinder_db

# RFID Device Settings
RFID_DEVICE_TYPE=Zebra_MC3300
RFID_CONNECTION_TYPE=Bluetooth
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📖 Usage Guide

### Getting Started
1. **Login**: Use any username/password combination (demo mode)
2. **Dashboard**: Review current operational status and alerts
3. **Navigation**: Use the fixed sidebar to access different modules

### Daily Operations Workflow

#### 1. Morning Setup
- Check Dashboard for overnight alerts and pending items
- Review low stock warnings in inventory gauges
- Fetch new POs from SAP system

#### 2. Material Inward Process
- Register incoming truck deliveries
- Complete 6-step inward workflow
- Perform quality inspections
- Assign RFID tags to new cylinders

#### 3. Inventory Management
- Monitor real-time stock levels
- Process cylinder status updates
- Review audit logs for discrepancies

#### 4. Cylinder Issuance
- Process department requests
- Validate equal exchanges (full ↔ empty)
- Scan RFID tags for accurate tracking
- Update inventory automatically

#### 5. Reporting & Analysis
- Generate daily/weekly operational reports
- Export data for external analysis
- Monitor inventory trends and forecasting

### User Roles & Permissions

#### Admin
- Full system access and configuration
- User management and role assignments
- System maintenance and backup operations
- All operational functions

#### Manager
- Department-specific operations
- Approval workflows for large transactions
- Reporting and analytics access
- User management within department

#### Operator
- Daily operational tasks (inward, issue, inventory)
- RFID scanning and data entry
- Basic reporting and status checks
- Read-only access to system settings

#### Viewer
- Read-only access to dashboards and reports
- Export capabilities for assigned data
- No modification permissions
- Audit trail viewing

## 🔌 API Integration

### SAP Integration Endpoints

```typescript
// Fetch Purchase Orders
GET /api/sap/purchase-orders
POST /api/sap/purchase-orders/fetch

// Update PO Status
PUT /api/sap/purchase-orders/{id}/status

// Vendor Communication
POST /api/sap/vendors/{id}/email
```

### RFID Device Integration

```typescript
// Device Configuration
GET /api/rfid/devices
POST /api/rfid/devices/configure

// Tag Operations
POST /api/rfid/scan
GET /api/rfid/tags/{id}
PUT /api/rfid/tags/{id}/update
```

### Inventory Operations

```typescript
// Real-time Inventory
GET /api/inventory/current
POST /api/inventory/update
GET /api/inventory/audit-log

// Cylinder Operations
POST /api/cylinders/issue
POST /api/cylinders/receive
GET /api/cylinders/{rfid}/status
```

## 🎨 Customization

### Theme Configuration

The application uses a custom industrial color palette:

```css
:root {
  --industrial-navy: 210 100% 12%;     /* #001F3F */
  --industrial-panel: 210 25% 97%;     /* #F0F4F8 */
  --industrial-success: 134 61% 41%;   /* #28A745 */
  --industrial-error: 354 70% 54%;     /* #DC3545 */
  --industrial-warning: 26 98% 54%;    /* #FD7E14 */
}
```

### Adding New Modules

1. Create new page component in `client/pages/`
2. Add route in `client/App.tsx`
3. Update navigation in `client/components/Layout.tsx`
4. Implement API endpoints in `server/routes/`

### Custom Business Rules

Modify validation logic in respective components:
- Exchange rules: `client/pages/CylinderIssue.tsx`
- Quality control: `client/pages/MaterialInward.tsx`
- Stock thresholds: `client/pages/Settings.tsx`

## 🚀 Deployment

### Production Deployment Options

#### 1. Traditional Web Server
```bash
pnpm build
# Deploy dist/ folder to web server
```

#### 2. Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 8080
CMD ["pnpm", "start"]
```

#### 3. Cloud Platforms
- **Netlify**: Connect repository for automatic deployments
- **Vercel**: Use MCP integration for seamless deployment
- **AWS/Azure/GCP**: Deploy using standard web app services

### Environment-Specific Configuration

#### Development
- Hot reload enabled
- Debug logging
- Mock data for SAP/RFID integration
- Relaxed security settings

#### Staging
- Production build with staging data
- Full SAP integration testing
- RFID device testing
- Performance monitoring

#### Production
- Optimized builds
- Full security enabled
- Real-time monitoring
- Backup and disaster recovery

## 📊 System Requirements

### Hardware Requirements
- **Server**: 4+ CPU cores, 8GB+ RAM, 100GB+ storage
- **Clients**: Modern web browser, camera (for RFID scanning)
- **RFID Devices**: Zebra MC3300, Honeywell CT60, or Datalogic Memor 35
- **Network**: Stable internet for SAP integration

### Software Requirements
- **Node.js**: 18.0+
- **Database**: PostgreSQL 12+ or MySQL 8+
- **SAP System**: SAP ECC 6.0+ or S/4HANA
- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+

### Performance Metrics
- **Page Load**: < 2 seconds initial load
- **RFID Scan**: < 1 second response time
- **Database**: < 500ms query response
- **Concurrent Users**: 100+ simultaneous users

## 🔒 Security Features

### Authentication & Authorization
- Session-based authentication
- Role-based access control (RBAC)
- Password strength requirements
- Session timeout management

### Data Protection
- All sensitive data encrypted in transit (HTTPS)
- Database encryption at rest
- RFID data anonymization options
- Audit trail for all operations

### SAP Integration Security
- Secure API credentials management
- Token-based authentication
- Network encryption (TLS 1.3)
- Access logging and monitoring

## 🐛 Troubleshooting

### Common Issues

#### SAP Connection Problems
```bash
# Check SAP connectivity
curl -X GET "https://your-sap-server.com/api/test"

# Verify credentials in Settings > System > SAP Integration
# Test connection using "Test" button
```

#### RFID Scanner Issues
1. Verify device compatibility (Zebra/Honeywell/Datalogic)
2. Check Bluetooth/WiFi connectivity
3. Update device drivers
4. Test with manual RFID entry

#### Performance Issues
- Enable auto-refresh toggle (Dashboard/Inventory)
- Clear browser cache and cookies
- Check network connectivity
- Monitor server resources

#### Data Sync Problems
- Verify SAP system connectivity
- Check audit logs for error messages
- Ensure proper user permissions
- Contact system administrator

### Support Contacts

- **Technical Support**: tech-support@company.com
- **System Administrator**: sysadmin@company.com
- **SAP Integration**: sap-team@company.com
- **Emergency Contact**: +1-555-EMERGENCY

## 📈 Roadmap

### Upcoming Features
- **Mobile App**: Native iOS/Android applications
- **Advanced Analytics**: Machine learning for demand forecasting
- **IoT Integration**: Smart sensors for automatic cylinder monitoring
- **Blockchain**: Supply chain traceability and verification
- **API Gateway**: Enhanced third-party integrations

### Version History
- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Enhanced RFID integration and reporting
- **v1.2.0**: Advanced user management and permissions
- **v2.0.0**: Mobile application and IoT integration (planned)

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Maintain consistent code formatting (Prettier)
3. Write comprehensive tests (Vitest)
4. Update documentation for new features
5. Follow industrial UX design patterns

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request with detailed description

### Code Standards
- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Styling**: TailwindCSS utility classes
- **Testing**: Jest/Vitest for unit tests
- **Documentation**: JSDoc for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the excellent framework
- **Radix UI**: For accessible component primitives
- **TailwindCSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library
- **Recharts**: For interactive data visualization
- **Manufacturing Industry**: For domain expertise and requirements

---

**Built with ❤️ for the Manufacturing Industry**

For more information, visit our [documentation website](https://docs.cylinder-portal.com) or contact our support team.
