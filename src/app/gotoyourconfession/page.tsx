'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';

export default function SignIn() {
  const [sessionName, setSessionName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleSendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const verifyResponse = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (!verifyResponse.ok) {
        throw new Error('OTP verification failed');
      }

      const result = await signIn('credentials', {
        redirect: false,
        sessionName,
        password,
        phoneNumber,
        otp,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push(`/confession/123123`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg"> {/* Increased max-width for larger container */}
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-indigo-800">Access Your Confession</CardTitle> {/* Increased font size */}
          <CardDescription className="text-center text-indigo-700">Enter your credentials to view your confession</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 rounded-lg shadow-xl"> {/* Increased padding and shadow */}
            <form onSubmit={handleVerifyOTP} className="space-y-6"> {/* Increased space between form elements */}
              <div className="space-y-4"> {/* Increased space between input groups */}
                <div className="space-y-2">
                  <Label htmlFor="sessionName">Session Name</Label>
                  <Input
                    id="sessionName"
                    placeholder="Enter your session name"
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    required
                    className="text-lg p-3" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-lg p-3"  
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="text-lg p-3"  
                  />
                </div>
              </div>

              {!otpSent ? (
                <Button
                  type="button"
                  onClick={handleSendOTP}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300 py-3 text-lg"  
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP sent to your phone"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="text-lg p-3" 
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300 py-3 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Access Confession'}
                  </Button>
                </>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
