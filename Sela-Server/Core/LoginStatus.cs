namespace Sela_Server.Core
{
    /// <summary>
    /// Object that indicate user login status and will be transfered to Angular side
    /// </summary>
    public class LoginStatus
    {
        internal static LoginStatus LoginSuccess = new LoginStatus() { ErrorMessage = string.Empty, Success = true, Token = "SelaGroup-Token" };

        /// <summary>
        /// Get or sets boolean flag indicate of login operation was successful or not 
        /// </summary>
        public bool Success
        {
            get;
            set;
        }

        /// <summary>
        /// Get or sets error message in case it occurred
        /// </summary>
        public string ErrorMessage
        {
            get;
            set;
        }

        /// <summary>
        /// Get or set JWT token
        /// </summary>
        public string Token
        {
            get;
            set;
        }
    }
}
