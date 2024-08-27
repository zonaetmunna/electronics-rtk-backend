const Gender = ['male', 'female', 'other']

const BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const AdminSearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
]

module.exports = {
  Gender,
  BloodGroup,
  AdminSearchableFields,
}
