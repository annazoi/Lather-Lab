import React from 'react';

export default function Contact() {
	return (
		<main className="min-h-screen pt-32 pb-24 bg-[#F9F8F6] text-stone-900">
			<div className="max-w-3xl mx-auto px-6 lg:px-12 text-center mt-10">
				<span className="text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold block mb-4">
					Get In Touch
				</span>
				<h1 className="text-4xl lg:text-[44px] font-serif tracking-wide mb-6">Contact Us</h1>
				<p className="text-stone-500 font-sans text-[13px] leading-relaxed mb-12 max-w-lg mx-auto">
					Have a question about our products or want to discuss a custom order? We'd love to hear from you. Fill
					out the form below and we'll get back to you shortly.
				</p>

				<form className="bg-white p-8 md:p-12 shadow-sm rounded-sm text-left max-w-2xl mx-auto border border-stone-100">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div>
							<label
								htmlFor="firstName"
								className="block text-[10px] font-bold uppercase tracking-widest text-[#1C1917] mb-2"
							>
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								className="w-full bg-[#f4f7f2] border border-[#e8ebe6] text-sm px-4 py-3.5 focus:outline-none focus:border-[#86967E] transition-colors"
								placeholder="Enter your First Name"
							/>
						</div>
						<div>
							<label
								htmlFor="lastName"
								className="block text-[10px] font-bold uppercase tracking-widest text-[#1C1917] mb-2"
							>
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								className="w-full bg-[#f4f7f2] border border-[#e8ebe6] text-sm px-4 py-3.5 focus:outline-none focus:border-[#86967E] transition-colors"
								placeholder="Enter your Last Name"
							/>
						</div>
					</div>

					<div className="mb-6">
						<label
							htmlFor="email"
							className="block text-[10px] font-bold uppercase tracking-widest text-[#1C1917] mb-2"
						>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							className="w-full bg-[#f4f7f2] border border-[#e8ebe6] text-sm px-4 py-3.5 focus:outline-none focus:border-[#86967E] transition-colors"
							placeholder="Enter your Email Address"
						/>
					</div>

					<div className="mb-8">
						<label
							htmlFor="message"
							className="block text-[10px] font-bold uppercase tracking-widest text-[#1C1917] mb-2"
						>
							Message
						</label>
						<textarea
							id="message"
							rows={5}
							className="w-full bg-[#f4f7f2] border border-[#e8ebe6] text-sm px-4 py-3.5 focus:outline-none focus:border-[#86967E] transition-colors resize-none"
							placeholder="Enter your Message"
						></textarea>
					</div>

					<button
						type="submit"
						className="w-full bg-[#1C1917] text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 hover:bg-[#86967E] transition-colors"
					>
						Send Message
					</button>
				</form>
			</div>
		</main>
	);
}
