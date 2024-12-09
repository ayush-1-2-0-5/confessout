'use client';

import { useState } from 'react';
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
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOTP = async () => {
    setIsLoading(true);
    setError('');
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
      setError('Error sending OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const otpResponse = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      
      if (!otpResponse.ok) {
        throw new Error('Invalid OTP');
      }

      const authResponse = await fetch('/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionName, password, phoneNumber }),
      });

      if (!authResponse.ok) {
        throw new Error('Authentication failed');
      }

      const sessionResponse = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionName }),
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      const { sessionToken } = await sessionResponse.json();
      localStorage.setItem('sessionToken', sessionToken);
      console.log('Navigation starting...');
      window.location.href = `/confession/${sessionName}`;
      console.log('Navigation completed');
    } catch (error) {
      console.error('Error during sign-in process:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-indigo-800">Access Your Confession</CardTitle>
          <CardDescription className="text-center text-indigo-700">Enter your credentials to view your confession</CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
    
            <form onSubmit={(e) => { e.preventDefault(); handleSendOTP(); }} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-center text-indigo-800" htmlFor="sessionName">Session Name</Label>
                  <Input
                    id="sessionName"
                    placeholder="Enter your session name"
                    className='placeholder-black p-1 border text-black border-black'
                    value={sessionName}
                    onChange={(e) => setSessionName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-center text-indigo-800" htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className='placeholder-black p-1 border text-black border-black'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-center text-indigo-800" htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    className='placeholder-black p-1 border text-black border-black'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            // Step 2: OTP Verification Form
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-bold text-center text-indigo-800" htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    className='placeholder-black p-1 border text-black border-black'
                    placeholder="Enter the OTP sent to your phone"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full"
                  onClick={() => setOtpSent(false)}
                >
                  Back to Details
                </Button>
              </div>
            </form>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}

